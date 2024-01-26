from flask import Flask, request, jsonify
from flask_cors import CORS
from process import Plots
import numpy as np
# Create the app instance
app = Flask(__name__)
CORS(app)

defaultFilename = "/Users/nemati/Documents/Trial-Data/5087258-0018 2023-07-11-SecondTrialData/5087258-0018_Data/017-D2F-B5-5087258-0018.D"

# Well data information that uses the path to the well we are looking for


@app.route('/well')
def well():
    # Call the plot method to extract data
    well_data = Plots.plot_TIC(well_path=defaultFilename, channel="MSD1.MS")

    response = {"wellData": well_data}
    return jsonify(response), 200

# Route that will perform baseline correction


@app.route('/baselineCorrection', methods=['POST'])
def baselineCorrection():
    try:
        # Retreive data from the POST request
        data = request.get_json()
        # update the arrays to numpy so operation can be easier
        x_data = np.array(data.get("xData"))
        y_data = np.array(data.get("yData"))
        if "baselineTimeRange" in data:
            baseline_time_ranges = data.get("baselineTimeRange")
        else:
            baseline_time_ranges = None
        # extract the time region if available
        if "regionTime" in data:
            region_time = data.get("regionTime")
        else:
            region_time = None
        # Call helper function perform deafault baseline correction here
        baseline_corrected = Plots.plot_baseline_corrected(
            times=x_data, values=y_data, baseline_times=baseline_time_ranges, region_time=region_time)
        # Return baseline as a response from the POST request
        response = baseline_corrected
        return jsonify(response), 200

    except Exception as e:
        return jsonify({'error': str(e)})

# Route that gives the path and channel that we need to process


@app.route('/area', methods=['POST'])
def area():
    try:
        # Retrieve data from the POST request
        data = request.get_json()
        # update the arrays to numpy so operation can be easier
        x_data = data.get("xData")
        y_data = data.get("yData")
        range = data.get("range")
       # Call helper function to preform area
        region_area = Plots.calculate_area(
            times=x_data, values=y_data, time_range=range)
        # Return area as a response from the POST request
        response = {'area': region_area}
        return jsonify(response), 200

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True, port=7000)
