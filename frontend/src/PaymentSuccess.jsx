import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import Logo from '../src/assets/images/logo.png';
import TourImage from '../src/assets/images/Bookings01.jpg';
import {  Text, Center, Button,Heading  } from '@chakra-ui/react';
import { Container, Row, Col} from 'reactstrap';
import { useSearchParams } from 'react-router-dom';
import './styles/paymentSuccess.css';

const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0];
    const pdfRef = useRef();
    const referenceNum = searchQuery.get('reference');
    // console.log(tourName2, userId2, guestSize2);
    const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('travel-trek.pdf');
        });
    };

    return (
        <>
        <div ref={pdfRef} className='manager'>
            <Container className="payment-success-container">

                <Row className="justify-content-between align-items-center mb-4">
                    <Col>
                        <img src={Logo} alt="Logo" className="logoPayment" />
                    </Col>
                    <Col className="text-end">
                        <Text style={{ fontSize: '1.5rem' }}><b>{localStorage.getItem('userName')}</b></Text>
                    </Col>


                </Row>
                <Heading textTransform="uppercase" fontSize='3rem' fontWeight="bold" color="blue.500" textAlign="center" mb={4} fontFamily="cursive">
                        Payment Successful 😍
                    </Heading>
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <img src={TourImage} alt="Tour Image" className="tourImage" />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={15} md={11}>
                        <table className="table">
                            <tbody> 
                                <tr>
                                    <td>UserID</td>
                                    <td>{localStorage.getItem('userId')}</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>{localStorage.getItem('userName')}</td>
                                </tr>
                                <tr>
                                    <td>Tour</td>
                                    <td>{localStorage.getItem('tourName')}</td>
                                </tr>
                                <tr>
                                    <td>Date Of Tour</td>
                                    <td>{localStorage.getItem('book')}</td>
                                </tr>
                                <tr>
                                    <td>Phone No.</td>
                                    <td>{localStorage.getItem('phone')}</td>
                                </tr>
                                <tr>
                                    <td>No. Of Tourists</td>
                                    <td>{localStorage.getItem('guestSize')}</td>
                                </tr>
                                <tr>
                                    <td>Amount Paid</td>
                                    <td>₹{localStorage.getItem('amount')}</td>
                                </tr>
                                <tr>
                                    <td>PaymentId</td>
                                    <td>{referenceNum}</td>
                                </tr>
                                <tr>
                                    <td>Payment</td>
                                    <td>Successful</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Heading textDecoration="blink" textShadow="0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black, 1px 1px 2px red" textColor="Yellow" fontSize="5xl" textAlign="center" fontWeight="bold" fontStyle="italic" paddingTop = "110px" mb={8}>
                        Thank You for Visting Travel-Trek 😍 !!
                </Heading>
            </Container>
            {/* <Heading textDecoration="blink" textShadow="0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black, 1px 1px 2px red" textColor="red" fontSize="5xl" textAlign="center" fontWeight="bold" fontStyle="italic" paddingTop = "110px" mb={8}>
                        Thank You for Visting Travel-Trek 😍🙏🏻 !!
            </Heading> */}
        </div>
        <Center>
            <Button className="btn primary__btn" onClick={downloadPDF}>
                Download Tour Info
            </Button>
        </Center>
        {/* {localStorage.clear()} */}
        </>
    );
};

export default PaymentSuccess;
