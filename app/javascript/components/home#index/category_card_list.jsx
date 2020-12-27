import React from 'react'

import AppCategoryCard from './category_card.jsx'

import { List } from 'antd';

const data = [
  {
    title: "日式料理",
    image: "https://www.flaticon.com/svg/static/icons/svg/2921/2921811.svg",
  },
  {
    title: "韓式料理",
    image: "https://www.flaticon.com/svg/static/icons/svg/2511/2511138.svg",
  },
  {
    title: "速食",
    image: "https://www.flaticon.com/svg/static/icons/svg/2921/2921822.svg",
  },

  {
    title: "飲料",
    image: "https://www.flaticon.com/svg/static/icons/svg/2921/2921819.svg",
  },
  {
    title: "甜點",
    image: "https://www.flaticon.com/svg/static/icons/svg/1997/1997775.svg",
  },
  {
    title: "蔬食",
    image: "https://www.flaticon.com/svg/static/icons/svg/1998/1998095.svg",
  },
];


const AppCategoryCardList = () => {
  return(
    <List
      grid={{
        gutter: 16,
        xs: 2,
        sm: 3,
        md: 6,
        lg: 6,
        xl: 6,
        xxl: 6,
      }}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <AppCategoryCard 
            image={item.image}
            title={item.title}
            description={item.description}
            >
          </AppCategoryCard>
        </List.Item>
      )}
    />
  );
}

export default AppCategoryCardList;