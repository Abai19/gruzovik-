import { useState } from 'react';
import Vehicle from '@components/Vehicle/Vehicle';
import { useRouter } from 'next/router';
import { ICargo, ICargoItem } from '@src/types/types';
import CargoItem from '@components/CargoItem/CargoItem';
import Contacts from '@components/Contacts/Contacts';
import { GetServerSideProps } from 'next'

export const  getServerSideProps :GetServerSideProps = async({ query }) =>{
  let res;
  if(Object.keys(query).length > 0) {
    res = await fetch(`https://cargo-transportation.onrender.com/cargo/getList?city=${query.from}&startDate=&endDate=&page=1&limit=10`)
  }
  else {
    res = await fetch(`https://cargo-transportation.onrender.com/cargo/getList?city=&startDate=&endDate=&page=1&limit=10`)
  }
  //const res = await fetch(`https://cargo-transportation.onrender.com/cargo/getList?city=&startDate=&endDate=&page=1&limit=10`)
  const data : ICargo = await res.json()
  return { props: data  }
}
export default function Home( data :ICargo) {
  const [show, setShow] = useState(true)
  const router = useRouter();
  console.log(data)
 
  const [open, setOpen] = useState(false);
  const [contactData, setContactData]= useState<Pick<ICargoItem,'contacts'> | null>(null)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getContacts =(contacts: Pick<ICargoItem,'contacts'>)=> {
    
    console.log(contacts)
    setContactData(contacts)
    handleOpen()
  }
  console.log(data)
  return (
    <>
      <main>
        {/* <Header/> */}
        <div className="main">
          home
           {
           data.cargos &&  data.cargos.map(cargo=> (
              <CargoItem  key={cargo.id} cargo={cargo}/>
            ))
           }
           {/* {
              open && contactData && (
                <Contacts open={open} handleClose={handleClose} contactData={contactData} />
              )
           } */}
        </div>
      </main>
    </>
  )
}
