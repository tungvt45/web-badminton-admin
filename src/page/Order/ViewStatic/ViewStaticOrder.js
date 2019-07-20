import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { DatePicker } from 'antd';
import { getStoreStatic } from './StaticFcSServiec';
import { isEmpty } from '../../../utils/helpers/helpers';

const { MonthPicker } = DatePicker;
class ViewStaticOrder extends Component {
  state = {
    listStoreStatic: []
  };
  componentDidMount() {
    this.fetchStatic();
  }
  fetchStatic = async params => {
    const res = await getStoreStatic(params);
    this.setState({ listStoreStatic: res.data });
  };
  handleChange = (date, dateString) => {
    this.fetchStatic({ month: dateString });
  };
  render() {
    const { listStoreStatic } = this.state;
    let cate = [];
    let seriesTemp = [];
    if (!isEmpty(listStoreStatic)) {
      listStoreStatic.forEach(el => {
        let temp = { name: el.storeName, data: [] };
        if (!isEmpty(el.statisticVMS)) {
          el.statisticVMS.forEach(item => {
            cate.push(new Date(item.day).getDate());
            temp.data.push(item.total);
          });
        }
        seriesTemp.push(temp);
      });
    } else {
      seriesTemp.push({ name: '', data: [] });
    }
    const options = {
      chart: { id: 'basic-bar' },
      xaxis: { categories: [...cate] }
    };
    const series = [...seriesTemp];
    return (
      <div style={{ paddingLeft: '25%', paddingTop: '2%' }}>
        <div className="App">
          <h2>Thống Kê</h2>
          <MonthPicker
            placeholder="Select month"
            onChange={this.handleChange}
          />
          <Chart options={options} series={series} type="line" width="500" />
        </div>
      </div>
    );
  }
}
export default ViewStaticOrder;
