import React from 'react'

import { Input, Row, Col } from 'antd';

const { Search } = Input;

const onSearch = value => console.log(value);

const AppSearch = () => {
  return(
    <Row justify="space-between">
      <Col span={17}>
        <Input.Group compact style={{width:'100%'}}>
              <Input.Search
                placeholder="請輸入地址..."
                onSearch={onSearch} 
                allowClear
                enterButton="外送Go" />
        </Input.Group>
      </Col>
      <Col span={6}>
        <Search 
          placeholder="想吃點什麼?" 
          onSearch={onSearch} 
          enterButton 
          allowClear
          style={{width:'100%'}}
        />
      </Col>
    </Row>
  )
}

export default AppSearch;