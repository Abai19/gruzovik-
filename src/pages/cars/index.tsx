
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ICar } from '@src/types/types';
import CarItem from '@components/CarItem/CarItem';

export async function getServerSideProps() {
  const res = await fetch(`https://cargo-transportation.onrender.com/cars/getList?city=&startDate=&endDate=&page=1&limit=10`)
  const data : ICar = await res.json()
  return { props:  data  }
}
export default function Cars(data : ICar ) {
  console.log(data);
  const [show, setShow] = useState(true)
  const router = useRouter();
  return (
    <>
      <main>
        <div className="main">
            cars
             {
              data.cars.map((car)=> (
                    <CarItem key ={ car.id}{...car}/>
              ))
            }
        </div>
      </main>
    </>
  )
}
