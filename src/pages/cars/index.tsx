
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ICar, ICarItem } from '@src/types/types';
import CarItem from '@components/CarItem/CarItem';
import Contacts from '@components/Contacts/Contacts';
import { GetServerSideProps } from 'next';
import ReactPaginate from 'react-paginate';
import useMediaQuery from '@mui/material/useMediaQuery';
import Table from '@components/Table/Table';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const page = query.page ? Number(query.page) : 1; // Get the page number from the query parameter
    const limit = 10; // Set your desired limit per page

    const city = query.from || '';
    const res = await fetch(`https://cargo-transportation.onrender.com/cars/getList?city=${city}&startDate=&endDate=&page=${page}&limit=${limit}`);
    const data: ICar = await res.json()
    return { props: data }
}
export default function Cars(data: ICar) {
    const matches = useMediaQuery('(min-width:925px)');

    const router = useRouter();
    const currentPage = router.query.page ? Number(router.query.page) - 1 : 0;
    const totalPages = Math.ceil(data.count / 10); // Assuming total is available in the 'total' field of the response

    const handlePageChange = ({ selected }: { selected: number }) => {
        const query = { ...router.query };
        query.page = (selected + 1).toString();
        router.push({ pathname: router.pathname, query });
    };
    return (
        <>
            <main>
                <div className="main">
                    {
                        data.cars &&
                        (matches ? (
                            <Table page="cars" cars={data.cars} />
                        ) : (
                            data.cars.map((car) => (
                                <CarItem key={car.id} car={car} />
                            ))
                        ))
                    }

                    <ReactPaginate
                        pageCount={totalPages}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageChange}
                        nextLabel=">>"
                        previousLabel="<<"
                        containerClassName="pagination"
                        activeClassName="active"
                        initialPage={currentPage}
                    />
                </div>
            </main>
        </>
    )
}
