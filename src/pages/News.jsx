import React, { useState } from 'react';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

import { Typography, Row, Col, Avatar, Select, Card } from 'antd';
import Loader from '../components/Loader';

const { Text, Title } = Typography;
const { Option } = Select;

function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState('Cryotocurrency')
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 50 });

  const { data } = useGetCryptosQuery(100);

  console.log(cryptoNews);

  if(isFetching) return <Loader />

  return (
    <>
      {
        !simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto News"
              optionFilterProp='children'
              onChange={value => setNewsCategory(value)}
              filterOption={(input, option) => option.children.toLowercase().indexOf(input.toLowerCase()) >= 0 }
            >
            <Option value="Cryotocurrency">Cryotocurrency</Option>
            {
              data?.data?.coins.map( (coin, idx) => <Option key={idx} value={coin.name}>{coin.name}</Option>)
            }
            </Select>
          </Col>
        )
      }

      <Row gutter={[24, 24]} >
      {
        cryptoNews.value.map( (news, idx) =>(
          <Col xs={24} sm={12} lg={8} key={idx} >
          <Card className="news-card"
            hoverable
          >
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.name}</Title>
                <img src={news.image?.thumbnail?.contentUrl || 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'} alt={news.name} style={{maxWidth: '200px', maxHeight: '100px'}} />
              </div>

              <p>
                {
                  news.description > 50 ? `${news.description.subString(0, 50)}...` : news.description
                }
              </p>

              <div className="provider-container">
                <div>
                  <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News' } alt="" />
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
          </Col>
        ))
      }
      </Row>
    </>
  )
}

export default News