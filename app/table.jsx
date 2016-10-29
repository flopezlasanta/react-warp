const onClick = (cell, row) => {
  console.log('cell:', cell)
  console.log('row:', row)
}

const cursorClass = { cursor: 'pointer' }

const dataFormat = (cell, row) => {
  return (
    <div style={cursorClass} onClick={() => onClick(cell, row)}>{cell}</div>
  )
}

const fields = [
  {
    title: 'ID',
    dataField: 'id',
    isKey: true,
    dataAlign: 'right',
    width: '50',
    dataSort: true,
    dataFormat: dataFormat
  },
  {
    title: 'Domain',
    dataField: 'domain',
    isKey: false,
    dataAlign: 'left',
    width: undefined,
    dataSort: true,
    dataFormat: undefined
  },
  {
    title: 'Subdomain',
    dataField: 'subDomain',
    isKey: false,
    dataAlign: 'left',
    width: undefined,
    dataSort: true,
    dataFormat: undefined
  },
  {
    title: 'IP Address',
    dataField: 'ip',
    isKey: false,
    dataAlign: 'left',
    width: undefined,
    dataSort: true,
    dataFormat: dataFormat
  }
]

const rows = fields.map((field) => {
  return (
    <TableHeaderColumn key={field.dataField} {...field}>
      {field.title}
    </TableHeaderColumn>
  )
})

ReactDOM.render(
  <div className='container'>
    <h3>Table [{' ' + data.length + ' '}]</h3>
    <BootstrapTable data={data} bordered={false} search striped hover pagination options={{clearSearch: true}}>
      {rows}
    </BootstrapTable>
  </div>,
  document.getElementById('root')
)