import { Col, Row, Image, Typography, Card, Form, Button, Rate, Input } from "antd";
import { StarOutlined, SendOutlined } from "@ant-design/icons";
import "./ShopProfile.css";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

const initialFormState = {
    // profile_pic: "https://media.licdn.com/dms/image/D5603AQH503kJ6XqNxQ/profile-displayphoto-shrink_800_800/0/1666810388572?e=1686787200&v=beta&t=RZamxmNrhbyR1eWTHtlvUvaNTlyk9_aNhOXHYW9UL_U",
    text: "",
    rating: 0,
    drink_name: "",
    // customer_name: "Lam Nguyen",
};


function ShopProfile() {
    const jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijc2MTIxNzA1LWU3ZjQtNDI4ZC1iOTk1LTUzYzNmY2QwMjVhMyIsInVzZXJuYW1lIjoiamFuaWNlIiwiaGFzaHBhc3MiOiJiJ2FtbDZhR1U9JyJ9.Aok-VWRAkraeWvzTiZRa0s69sM8cP_MFZWgCGM9BtaA\"}";
    const jwt2 = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjZhMmRlMTU2LWQ2NzAtNDNlMC05NDM5LTVlNTVmYThlNzhmZSIsInVzZXJuYW1lIjoiRE0iLCJoYXNocGFzcyI6ImInWVE9PScifQ.OusPbgVk04hRQoMsvjkK7uKS0K2948jXQQIk0b-3BBs";
    const url1 = "http://127.0.0.1:8000/api/bobashop/fdc4875e-c552-486e-b6c3-a4e0d715eaed/";
    const url2 = "http://127.0.0.1:8000/api/bobashop/0cb08e98-d603-4545-8f33-63e9cf7e61b3/";
    const putUrl = "http://127.0.0.1:8000/api/reviews/";
    // const relativeUrl = "/api/bobashop/";

    const getOptions = {
        method: 'GET',
        url: url1,
        headers: {
            Authorization: `Bearer ${jwt2}`,
        }
    };

    

    const [reviewForm, setReviewForm] = useState(initialFormState);
    const [data, setData] = useState({});

    const avatar = "https://media.licdn.com/dms/image/D5603AQH503kJ6XqNxQ/profile-displayphoto-shrink_800_800/0/1666810388572?e=1686787200&v=beta&t=RZamxmNrhbyR1eWTHtlvUvaNTlyk9_aNhOXHYW9UL_U";

    const onSubmit = () => {
        const newData = JSON.parse(JSON.stringify(data));
        newData.reviews.unshift(reviewForm);
        setData(newData);

        putReview();

        setReviewForm(initialFormState);
    };

    const putOptions = {
        method: 'PUT',
        url: putUrl,
        headers: {
            Authorization: `Bearer ${jwt2}`,
        },
        data: reviewForm,
    };

    const putReview = async () => {
        const result = await axios.request(putOptions)
                        .then(res => res.data)
                        .catch(error => console.log(error.response));
        

        console.log(result);
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.request(getOptions)
                .then(res => res.data)
                .catch(error => console.log(error.response));
    
            result.opening_hour = result?.opening_hour?.slice(0, 5);
            result.closing_hour = result?.closing_hour?.slice(0, 5);
    
            const jsonResult = JSON.parse(JSON.stringify(result));
            console.log(jsonResult);
            setData(jsonResult);
            console.log(data);
        }
        fetchData();
    }, []);

    return (
        <>
            {/* whole page with two columns */}
            <Row className="extend-whole-page" gutter={[30, 0]} >
                {/* left column */}
                <Col span={9} className="pink-bg">
                    <Row className="shop-info">
                        {/* image and rating */}
                        <Col span={8}>
                            <Row justify="center" align="middle">
                                <Col span={24} className="center-image">
                                    <Image src={data?.image_url} width="14em" />
                                </Col>
                                <Col span={24} style={{ fontSize: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {data?.rating} <StarOutlined />
                                </Col>
                            </Row>
                        </Col>
                        {/* shop info */}
                        <Col span={16} style={{ fontSize: '1.7em' }}>
                            <Typography.Title strong={true} style={{ marginTop: '0', fontWeight: '1000' }}>
                                <b>{data?.shop_name}</b> <br />
                            </Typography.Title>
                            <b>Address:</b>{data?.address}<br />
                            <b>Hours:</b> {data?.opening_hour} - {data?.closing_hour} <br />
                            <b>Tel:</b> {data?.telephone} <br />
                        </Col>
                    </Row>
                    {/* shop images */}
                    <Row className="images">
                        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography.Title style={{ marginTop: '0', marginBottom: '0' }}>
                                <b>Images</b>
                            </Typography.Title>
                        </Col>
                        <Row gutter={[12, 12]}>
                            {
                                data?.ad_image_url?.map((img, i) => (
                                    <Col key={i} span={12} className="center-image">
                                        <Image src={img} height="20em" />
                                    </Col>))
                            }
                        </Row>
                    </Row>
                </Col>
                {/* right column */}
                <Col span={15}>
                    {/* best sellers */}
                    <Row gutter={16} justify='start' className="pink-bg" style={{ padding: '1em' }}>
                        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography.Title style={{ marginTop: '0.4em' }}>
                                <b> Best Sellers </b>
                            </Typography.Title>
                        </Col>
                        {
                            data?.top_drink?.map((drink, i) => (
                                <Col key={i} span={4}>
                                    <Card
                                        cover={<img alt="example" src={drink.image_url} width='3em' height="250vh" />}
                                    >
                                        <Row style={{ margin: '-1em' }}>
                                            <Col span={24} style={{ fontSize: '1.5em', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em' }}>
                                                <b>{drink.drink_name}</b>
                                            </Col>
                                            <Col span={24} style={{ fontSize: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <b>{drink.rating}</b> <StarOutlined />
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                    {/* input user's text */}
                    <Row gutter={[10, 0]} className='grey-bg'>
                        {/* avatar */}
                        <Col span={2}>
                            <Image src={avatar} />
                        </Col>
                        {/* text form and submission */}
                        <Col span={22}>
                            <Form style={{ backgroundColor: 'white', padding: '1em' }}>
                                <Form.Item>
                                    <TextArea style={{fontSize: '1.5em'}} placeholder="Write a text here" rows={4} value={reviewForm.text} onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })} />
                                </Form.Item>
                                <Form.Item>
                                    <Row style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <Col style={{ fontSize: '1.5em' }}>
                                            Drink Ordered <br />
                                            <Input onChange={(e) => setReviewForm({ ...reviewForm, drink_name: e.target.value})} />
                                        </Col>
                                        <Col style={{ fontSize: '1.5em' }}>
                                            Rating:<br />
                                            <Rate style={{fontSize: '1.5em'}} onChange={(e) => setReviewForm({ ...reviewForm, rating: e})} />
                                        </Col>
                                        <Col style={{ display: 'flex', justifyContent: 'end'}}>
                                            <Button type="primary" onClick={onSubmit} style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'4em', width:'5em', backgroundColor: '#ffeeef', color: 'black' }}>
                                                <SendOutlined style={{fontSize: '2.5em'}} />
                                            </Button>
                                        </Col>
                                    </Row>


                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    {/* show all reviews */}

                    {
                        data?.reviews?.map((review, i) => (
                            <Row key={i} gutter={[10, 0]} className='grey-bg'>
                                {/* avatar */}
                                <Col span={2}>
                                    <Image src={review.profile_pic} />
                                </Col>
                                {/* text text */}
                                <Col span={22}>
                                    <Row>
                                        <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography style={{ fontSize: '2em' }}>
                                                <b>{review.customer_name}</b> {review.rating} <StarOutlined />
                                            </Typography>
                                            <Typography style={{ fontSize: '1.5em' }}>
                                                Drink ordered: {review.drink_name}
                                            </Typography>
                                        </Col>
                                        <Col span={24} style={{ backgroundColor: 'white', fontSize: '1.5em', padding: '0.5em', minHeight: '5em' }}>
                                            {review.text}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                        ))
                    }

                </Col>
            </Row>
        </>
    );
}

export default ShopProfile;