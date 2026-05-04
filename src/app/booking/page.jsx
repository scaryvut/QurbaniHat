import React, { Suspense } from 'react';
import BookingPage from './BookingPage';

const MainBookingPage = () => {
    return (
        <Suspense fallback={<p>Loading</p>}>
            <BookingPage></BookingPage>
            
        </Suspense>
    );
};

export default MainBookingPage;