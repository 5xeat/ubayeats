import React from 'react'

import { Input, Row, Col } from 'antd';

import {
  SketchOutlined,
  SearchOutlined
} from '@ant-design/icons';

const onSearch = value => console.log(value);

const AppSearch = () => {
  return(
    <Row justify="space-between">
      <Col span={17}>
        <Input.Group compact style={{width:'100%'}}>
          <Input.Search
            placeholder="請輸入地址..."
            onSearch={onSearch} 
            allowClear={true}
            prefix={<SketchOutlined />}
            size="large"
            enterButton="外送Go" />
        </Input.Group>
      </Col>
      <Col span={6}>
        <Input
          placeholder="想吃點什麼?" 
          prefix={<SearchOutlined />}
          size="large"
          style={{borderRadius: '50px'}}
        />
      </Col>
    </Row>
  )
}

export default AppSearch;