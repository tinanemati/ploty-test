import rainbow as rb
from pandas import DataFrame
from json import loads
import numpy as np
from scipy.integrate import trapezoid
from scipy.interpolate import UnivariateSpline

class Plots():
    """A utility class for extracting plot's data, baseline correction in a specified Well."""
    def plot_TIC(well_path, channel):
        """extract the data for the total ion chromatogram.

    Args:
        well_path (str): The path to the well's data to plot.
        channel (str): The channel to plot for specified well.
    """
        # Extract the file from the directory given te channel
        datadir = rb.read(well_path, requested_files=[channel])
        datafile = datadir.get_file(channel)
        data = datafile.data.T
        # Extract the requested masses from the file
        df = DataFrame(data, columns=datafile.xlabels.tolist(),
                       index=datafile.ylabels.tolist())

        # only update the query like this if it is not the `ch` channel that was selected
        if "ch" not in channel:
            df = df.query("260 < index < 340")

        # Create the json object that will return the result from the data frame
        result = df.to_json(orient="split")
        parsed = loads(result)
        wellData = {
            "columns": parsed['columns'],
            "index": parsed['index'],
            "values": parsed['data']
        }
        return wellData

    def plot_baseline_corrected(times, values, baseline_times, region_time):
        """Plot baseline-corrected data for the extracted/absorbance chromatogram.

        Args:
            times (numpy.ndarray): Numpy array of times for the plot's x_data.
            values (numpy.ndarray): Numpy array of values for the plot's y_data.
            baseline_times (list): Array containing times selected by the user for baseline correction.
            region_time (dict): Time duration for the specified region of interest.
        """
        # check if any baseline points were sent
        if baseline_times:
            noise_mask = np.zeros_like(times, dtype=bool)
            for noise_region in baseline_times:
                noise_start, noise_end = noise_region["noise_start"], noise_region["noise_end"]
                noise_mask |= (times >= noise_start) & (times <= noise_end)
            noise_x = times[noise_mask]
            noise = values[noise_mask]
            spline = UnivariateSpline(noise_x, noise, k=1, s=1)
            baseline = spline(times)
        else:
            # calculate default baseline
            baseline = np.linspace(
                np.min(values), np.min(values), num=len(values))
        # extract the time region only if provided
        if region_time:
            min_time, max_time = region_time["min_time"], region_time["max_time"]
        else:
            min_time, max_time = times[0], times[-1]
        time_indices = [i for i, time in enumerate(
            times) if min_time <= time <= max_time]
        selected_times = times[time_indices]
        updated_values = values - baseline
        corrected_baseline = baseline[time_indices]
        baseline_corrected = {
            "baseline": corrected_baseline.tolist(),
            "times": selected_times.tolist(),
            "values": updated_values.tolist()
        }
        return baseline_corrected

    def calculate_area(times, values, time_range):
        """Calculate area for the selected regions in extracted/absorbance chromatogram.

        Args:
            times (list): Array of times for the plot's x_data.
            values (list): Array of values for the plot's y_data.
            time_range (list): Array containing time duration for the specified region of interest.
        """

        area = []
        # retreive slicing indecies from range
        for peak in time_range:
            peak_start, peak_end = peak["leftside"], peak["rightside"]
            # slice the x,y data axis given the peak start and end index
            xDataRange = times[peak_start:peak_end]
            yDataRange = values[peak_start:peak_end]
            # calulate the area given the updated axis
            peak_area = trapezoid(
                y=yDataRange,
                x=xDataRange
            )
            area.append(peak_area)

        return area
