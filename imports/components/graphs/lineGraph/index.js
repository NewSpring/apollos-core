// @flow
import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryScatter,
} from "victory";

const styles = {
  line: {
    data: { stroke: "#6bac43", strokeWidth: "3" },
  },
  scatter: {
    data: { fill: "#6bac43" },
  },
  axis: {
    axis: { stroke: "transparent", strokeWidth: "0" },
    tickLabels: {
      fontFamily: "colfax-web, sans-serif",
      fontSize: 10,
      padding: 20,
      fill: "#858585",
    },
  },
};

type ILineGraph = {
  data: Object,
  tickFormat: string[],
};

const LineGraph = ({
  data,
  tickFormat,
}: ILineGraph) => (
  <div className="push soft-half">
    <VictoryChart>
      <VictoryAxis
        style={styles.axis}
        tickFormat={tickFormat}
      />
      <VictoryScatter
        data={data}
        x="month"
        y="amount"
        style={styles.scatter}
      />
      <VictoryLine
        data={data}
        x="month"
        y="amount"
        style={styles.line}
      />
    </VictoryChart>
  </div>
);

export default LineGraph;
