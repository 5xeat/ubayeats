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
          <Col flex={2}><Rate disabled defaultValue={2} /></Col>
          <Col flex={1}><HeartOutlined key="like"/></Col>
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