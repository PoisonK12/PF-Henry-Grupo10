import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  import "./Chart.css";
  
  const data = [
    { name: "Enero", Total: 1200 },
    { name: "Febrero", Total: 2100 },
    { name: "Marzo", Total: 800 },
    { name: "Abril", Total: 1600 },
    { name: "Mayo", Total: 900 },
    { name: "Junio", Total: 1700 },
    { name: "Julio", Total: 1300 },
    { name: "Agosto", Total: 2100 },
    { name: "Septiembre", Total: 3100 },
    { name: "Octubre", Total: 700 },
    { name: "Noviembre", Total: 700 },
  ];
  
  const Chart = () => {
    return (
      <div className="chart">
        <div className="title">Ultimos 6 meses (Ganancias)</div>
        <ResponsiveContainer width="100%" aspect={2 / 1}>
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Total"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default Chart;