import { Col, Row, Image, Typography, Card, Form, Button, Rate, Select, Input } from "antd";
import { StarOutlined, SendOutlined } from "@ant-design/icons";
import "./ShopProfile.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
const { Option } = Select;

const initialFormState = {
    // profile_pic: "https://media.licdn.com/dms/image/D5603AQH503kJ6XqNxQ/profile-displayphoto-shrink_800_800/0/1666810388572?e=1686787200&v=beta&t=RZamxmNrhbyR1eWTHtlvUvaNTlyk9_aNhOXHYW9UL_U",
    text: "",
    rating: 0,
    drink_name: "",
    // customer_name: "Lam Nguyen",
};


function ShopProfile() {
    const [reviewForm, setReviewForm] = useState(initialFormState);
    const [data, setData] = useState({});
    let { boba_id } = useParams();

    // get jwt from session storage
    const jwt = sessionStorage.getItem("token");
    const placeholder = "https://scontent.xx.fbcdn.net/v/t1.15752-9/329766254_5741560349290924_4541925126048218166_n.png?_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_ohc=fs_zPy5csoQAX8k9vVU&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdStPVW_X4iWO-IslSvJKRRmdR_bIqbnOO-wu-GVV6zVYw&oe=646C02C8";

    // const relativeUrl = "/api/bobashop/";

    const getOptions = {
        method: 'GET',
        url: `http://127.0.0.1:8000/api/bobashop/${boba_id}/`,
        headers: {
            Authorization: `Bearer ${jwt}`,
        }
    };

    useEffect(() => {
        console.log(jwt);
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




    const onSubmitReview = () => {
        if (!isValidForm()) {
            return;
        }
        const newData = JSON.parse(JSON.stringify(data));
        newData.reviews.unshift(reviewForm);
        setData(newData);

        putReview();

        setReviewForm(initialFormState);
    };

    const putOptions = {
        method: 'PUT',
        url: "http://127.0.0.1:8000/api/reviews/",
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
        data: reviewForm,
    };

    const putReview = async () => {
        const result = await axios.request(putOptions)
            .then(res => res.data)
            .catch(error => console.log(error.response));


        console.log(result);
    }

    const isValidForm = () => {
        return reviewForm.text !== "" && reviewForm.rating !== 0 && reviewForm.drink_name !== "";
    }

    const formatPhoneNumber = (phoneNumberString) => {
        // console.log("tel:", phoneNumberString);
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return phoneNumberString;
    }

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
                            <b>Tel:</b> {formatPhoneNumber(data?.telephone)} <br />
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
                            data?.top_drink?.slice(0, 6).map((drink, i) => (
                                <Col key={i} span={4}>
                                    <Card
                                        cover={<img
                                            alt="example"
                                            src={drink.image_url}
                                            style={{ height: '15em', width: '15em', objectFit: 'cover' }}
                                        />}
                                    >
                                        <Row style={{ margin: '-1em' }}>
                                            <Col span={24} style={{ fontSize: '1.5em', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em' }}>
                                                <b>{drink.drink_name}</b>
                                            </Col>
                                            <Col span={24} style={{ fontSize: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <b>{Math.round(drink.rating * 10) / 10}</b> <StarOutlined />
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                    {/* REVIEW FORM */}
                    {data.is_shop_owner || <Row gutter={[10, 0]} className='grey-bg'>
                        {/* avatar */}
                        <Col span={2}>
                            <Image src={data?.user_picture || placeholder} />
                        </Col>
                        {/* text form and submission */}
                        <Col span={22}>
                            <Form style={{ backgroundColor: 'white', padding: '1em' }}>
                                <Form.Item>
                                    <TextArea
                                        style={{ fontSize: '1.5em' }}
                                        maxLength={500}
                                        status={reviewForm.text === "" ? "error" : "success"}
                                        placeholder="Write a text here"
                                        rows={4} value={reviewForm.text}
                                        onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })} />
                                </Form.Item>
                                <Form.Item>
                                    <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Col style={{ fontSize: '1.5em' }}>
                                            Drink ordered:<br />
                                            <Select
                                                style={{ width: '20em' }}
                                                status={reviewForm.drink_name === "" ? "error" : "success"}
                                                value={reviewForm.drink_name}
                                                onChange={value => setReviewForm({ ...reviewForm, drink_name: value })}>
                                                {
                                                    data?.top_drink?.map((drink, i) => (
                                                        <Option key={i} value={drink.drink_name}>{drink.drink_name}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Col>
                                        <Col style={{ fontSize: '1.5em' }}>
                                            Rating:<br />
                                            <Rate
                                                data-testid="rate-stars"
                                                value={reviewForm.rating}
                                                style={{ fontSize: '1.5em' }}
                                                onChange={(e) => setReviewForm({ ...reviewForm, rating: e })} />
                                        </Col>
                                        <Col style={{ display: 'flex', justifyContent: 'end' }}>
                                            <Button
                                                aria-label="send"
                                                type="primary"
                                                id='submit-button'
                                                onClick={onSubmitReview}
                                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '4em', width: '5em', backgroundColor: '#ffeeef', color: 'black' }}>
                                                <SendOutlined style={{ fontSize: '2.5em' }} />
                                            </Button>
                                        </Col>
                                    </Row>


                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    }
                    {/* ALL REVIEWS */}

                    {
                        data?.reviews?.map((review, i) => (
                            <Row key={i} gutter={[10, 0]} className='grey-bg'>
                                {/* avatar */}
                                <Col span={2}>
                                    <Image src={review.profile_pic || placeholder} />
                                </Col>
                                {/* review */}
                                <Col span={22}>
                                    <Row>
                                        <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography style={{ fontSize: '2em' }}>
                                                <b>{review.customer_name}</b> {Math.round(review.rating * 10) / 10} <StarOutlined />
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