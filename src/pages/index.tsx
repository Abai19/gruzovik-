import { useState } from 'react';
import Vehicle from '@components/Vehicle/Vehicle';
import { useRouter } from 'next/router';
import { ICargo } from '@src/types/types';
import CargoItem from '@components/CargoItem/CargoItem';

export async function getServerSideProps() {
  const res = await fetch(`https://cargo-transportation.onrender.com/cargo/getList?city=&startDate=&endDate=&page=1&limit=10`)
  const data : ICargo = await res.json()
  return { props: data  }
}
export default function Home( data :ICargo) {
  console.log(data)
  const [show, setShow] = useState(true)
  const router = useRouter();
  return (
    <>
      <main>
        {/* <Header/> */}
        <div className="main">
          home
           {
            data.cargos.map(cargo=> (
              <CargoItem key={cargo.id} {...cargo}/>
            ))
           }
        </div>
      </main>
    </>
  )
}
