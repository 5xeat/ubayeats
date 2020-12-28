import React from 'react'

import { Card, Rate, Row, Col } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

const { Meta } = Card;

const AppStoreCard = (props) => {
  return(
    <Card
      cover={
        <img
          alt="example"
          src={props.image}
        />
      }
      actions={[
        <Row align="middle">
          <Col span={18}><Rate disabled={true} defaultValue={2}/></Col>
          <Col span={6}><HeartOutlined key="like" style={{color:"#ea2b4b"}}/></Col>
        </Row>,
      ]}
      hoverable={true}
    >
      <Meta
        title={props.title}
        description={props.description}
      />
    </Card>
  );
}

export default AppStoreCard;