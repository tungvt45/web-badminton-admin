import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
class ComponentToPrint extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <th>column 1</th>
          <th>column 2</th>
          <th>column 3</th>
        </thead>
        <tbody>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
class TransactionListPage extends Component {
  render() {
    return (
      <div style={{ paddingLeft: '20%', paddingTop: '5%' }}>
        <div>
          <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => this.componentRef}
          />
          <ComponentToPrint ref={el => (this.componentRef = el)} />
        </div>
      </div>
    );
  }
}
export default TransactionListPage;
