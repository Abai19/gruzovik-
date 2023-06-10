
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ICar, ICarItem } from '@src/types/types';
import CarItem from '@components/CarItem/CarItem';
import Contacts from '@components/Contacts/Contacts';

export async function getServerSideProps() {
  const res = await fetch(`https://cargo-transportation.onrender.com/cars/getList?city=&startDate=&endDate=&page=1&limit=10`)
  const data : ICar = await res.json()
  return { props:  data  }
}
export default function Cars(data : ICar ) {
  console.log(data);
  const [show, setShow] = useState(true)

  const [open, setOpen] = useState(false);
  const [contactData, setContactData]= useState<Pick<ICarItem,'contacts'> | null>(null)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  return (
    <>
      <main>
        <div className="main">
            cars
             {
              data.cars.map((car)=> (
                    <CarItem key ={ car.id} car={car} />
              ))
              }
              {
              open && contactData && (
                <Contacts open={open} handleClose={handleClose} contactData={contactData} />
              )
           }
        </div>
      </main>
    </>
  )
}
