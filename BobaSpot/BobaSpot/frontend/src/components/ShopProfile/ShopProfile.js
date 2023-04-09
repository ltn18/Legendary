import { Col, Row, Image, Typography, Card, Form, Button } from "antd";
import { StarOutlined, SendOutlined } from "@ant-design/icons";
import "./ShopProfile.css";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";


function ShopProfile() {
    const url = "http://127.0.0.1:8000/api/bobashop/?id=0cb08e98-d603-4545-8f33-63e9cf7e61b3";
    // const relativeUrl = "/api/bobashop/";

    const options = {
        // method: 'PUT',
        url: url,
        data:
        {
            id: '0cb08e98-d603-4545-8f33-63e9cf7e61b3'
        }

    };

    const [reviewText, setReviewText] = useState('');


    const logoSource = "data:image/png;base64,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";
    const img1 = "https://lh3.googleusercontent.com/p/AF1QipMcXlswz907POXKPKXIzbtTFgR3_DUKaglUxPm2=s680-w680-h510";
    const img2 = "https://lh5.googleusercontent.com/p/AF1QipMW36PSipT5geHQTbm-z9zsFGDAVdMXGOTl_yxo=w141-h235-n-k-no-nu";
    const img3 = "https://lh5.googleusercontent.com/p/AF1QipMhk31bdrOmjOCRejLtJeN1CnY9291umJA89mPF=w141-h118-n-k-no-nu";
    const img4 = "https://lh5.googleusercontent.com/p/AF1QipM_-qKSLhxG2BYb99jKxCPP8wiY4FB22oZWOIca=w141-h141-n-k-no-nu";
    const drink1 = "https://www.kungfutea.com/wp-content/uploads/2021/08/Coffee_MilkTea.jpg";
    // const drink2 = "https://www.kungfutea.com/wp-content/uploads/2021/08/image-asset.jpeg";
    // const drink3 = "https://www.kungfutea.com/wp-content/uploads/2021/08/Coffee_MilkTea.jpg";
    const avatar = "data:image/jpeg;base64,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";

    const handleFormSubmit = () => {
        // console.log(reviewText);
        setReviewText('');
        axios.request(options)
            .then((res) => { console.log(res) })
            .catch((error) => {
                console.log(error.response);
                // if (error.response) {
                //     // The request was made and the server responded with a status code
                //     // that falls out of the range of 2xx
                //     console.log('error at response');
                //     console.log(error.response.data);
                //     console.log(error.response.status);
                //     console.log(error.response.headers);
                // } else if (error.request) {
                //     // The request was made but no response was received
                //     console.log('request made but no response');
                //     console.log(error.request);
                // } else {
                //     // Something happened in setting up the request that triggered an Error
                //     console.log('request made but error');
                //     console.log('Error', error.message);
                // }
            });

    };

    useEffect(() => {
        // axios.request(options)
        // .then((res) => { console.log(res) })
        // .catch((err) => { console.log(err) });
    }, []);



    return (
        <>
            {/* whole page with two columns */}
            <Row className="extend-whole-page" gutter={[30, 0]} >
                {/* left column */}
                <Col span={10} className="pink-bg">
                    <Row className="shop-info">
                        {/* image and rating */}
                        <Col span={8}>
                            <Row justify="center" align="middle">
                                <Col span={24} className="center-image">
                                    <Image src={logoSource} width="14em" />
                                </Col>
                                <Col span={24} style={{ fontSize: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    4.3 <StarOutlined />
                                </Col>
                            </Row>
                        </Col>
                        {/* shop info */}
                        <Col span={16} style={{ fontSize: '1.7em' }}>
                            <Typography.Title strong={true} style={{ marginTop: '0', fontWeight: '1000' }}>
                                <b>Kung Fu Tea</b> <br />
                            </Typography.Title>
                            <b>Address:</b> 11312 Euclid Eve, Cleveland, OH 44106 <br />
                            <b>Hours:</b> 12:00pm - 19:30pm <br />
                            <b>Tel:</b> (216) 862-7690 <br />
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
                            {/* TODO receive imgs from backend and renders the img from the link */}
                            <Col span={14} className="center-image">
                                <Image src={img1} height="20em" />
                            </Col>
                            <Col span={10} className="center-image">
                                <Image src={img2} height="20em" />
                            </Col>
                            <Col span={14} className="center-image">
                                <Image src={img3} height="20em" />
                            </Col>
                            <Col span={10} className="center-image">
                                <Image src={img4} height="20em" />
                            </Col>
                        </Row>
                    </Row>
                </Col>
                {/* right column */}
                <Col span={14}>
                    {/* best sellers */}
                    <Row justify='space-between' className="pink-bg" style={{ padding: '1em' }}>
                        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography.Title style={{ marginTop: '0.4em' }}>
                                <b> Best Sellers </b>
                            </Typography.Title>
                        </Col>
                        <Col span={4}>
                            <Card
                                cover={<img alt="example" src={drink1} width='20px' />}
                            >
                                <Row style={{ margin: '-1em' }}>
                                    <Col span={12}>
                                        <b>Kung Fu Milk Tea</b>
                                    </Col>
                                    <Col span={12} style={{ fontSize: '1.7em' }}>
                                        4.3 <StarOutlined />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card
                                cover={<img alt="example" src={drink1} width='20px' />}
                            >
                                <Row style={{ margin: '-1em' }}>
                                    <Col span={12}>
                                        <b>Kung Fu Milk Tea</b>
                                    </Col>
                                    <Col span={12} style={{ fontSize: '1.7em' }}>
                                        4.3 <StarOutlined />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card
                                cover={<img alt="example" src={drink1} width='20px' />}
                            >
                                <Row style={{ margin: '-1em' }}>
                                    <Col span={12}>
                                        <b>Kung Fu Milk Tea</b>
                                    </Col>
                                    <Col span={12} style={{ fontSize: '1.7em' }}>
                                        4.3 <StarOutlined />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card
                                cover={<img alt="example" src={drink1} width='20px' />}
                            >
                                <Row style={{ margin: '-1em' }}>
                                    <Col span={12}>
                                        <b>Kung Fu Milk Tea</b>
                                    </Col>
                                    <Col span={12} style={{ fontSize: '1.7em' }}>
                                        4.3 <StarOutlined />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card
                                cover={<img alt="example" src={drink1} width='20px' />}
                            >
                                <Row style={{ margin: '-1em' }}>
                                    <Col span={12}>
                                        <b>Kung Fu Milk Tea</b>
                                    </Col>
                                    <Col span={12} style={{ fontSize: '1.7em' }}>
                                        4.3 <StarOutlined />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>




                    </Row>
                    {/* input user's review */}
                    <Row gutter={[10, 0]} className='grey-bg'>
                        {/* avatar */}
                        <Col span={2}>
                            <Image src={avatar} />
                        </Col>
                        {/* review text and submission */}
                        <Col span={22}>
                            <Form style={{ backgroundColor: 'white', padding: '1em' }}>
                                <Form.Item>
                                    <TextArea placeholder="Write a review here" rows={4} value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                                </Form.Item>
                                <Form.Item style={{ display: 'flex', justifyContent: 'right' }}>
                                    <Button type="primary" onClick={handleFormSubmit} style={{ backgroundColor: '#ffeeef', color: 'black' }}>
                                        <SendOutlined />
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    {/* show all reviews */}
                    <Row gutter={[10, 0]} className='grey-bg'>
                        {/* avatar */}
                        <Col span={2}>
                            <Image src={avatar} />
                        </Col>
                        {/* review text and submission */}
                        <Col span={22}>
                            <Row>
                                <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography style={{ fontSize: '2em' }}>
                                        <b>Escanord Le</b> 5.0 <StarOutlined />
                                    </Typography>
                                    <Typography style={{ fontSize: '1.5em' }}>
                                        Drink ordered: Kung Fu Milk Tea
                                    </Typography>
                                </Col>
                                <Col span={24} style={{ backgroundColor: 'white', fontSize: '1.5em', padding: '0.5em' }}>
                                    This place is awesome! I go here daily to drink milk tea and Kung Fu Tea never disappoints! 10/10, would recommend.
                                    <br />
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in ficia deserunt mollit anim id est laborum.
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default ShopProfile;