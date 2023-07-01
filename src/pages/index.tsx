import { useState } from 'react';
import Vehicle from '@components/Vehicle/Vehicle';
import { useRouter } from 'next/router';
import { ICargo, ICargoItem } from '@src/types/types';
import CargoItem from '@components/CargoItem/CargoItem';
import Contacts from '@components/Contacts/Contacts';
import { GetServerSideProps } from 'next'
import ReactPaginate from 'react-paginate';
import useMediaQuery from '@mui/material/useMediaQuery';
import Table from '@components/Table/Table';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const page = query.page ? Number(query.page) : 1; // Get the page number from the query parameter
    const limit = 10; // Set your desired limit per page

    const city = query.from || '';
    const url = `https://cargo-transportation.onrender.com/cargo/getList?city=${city}&startDate=&endDate=&page=${page}&limit=${limit}`;

    const res = await fetch(url);
    //const res = await fetch(`https://cargo-transportation.onrender.com/cargo/getList?city=&startDate=&endDate=&page=1&limit=10`)
    const data: ICargo = await res.json()
    return { props: data }
}
export default function Home(data: ICargo) {
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
                        data.cargos &&
                        (matches ? (
                            <Table page="cargo" cargos={data.cargos} />
                        ) : (
                            data.cargos.map((cargo) => <CargoItem key={cargo.id} cargo={cargo} />)
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
