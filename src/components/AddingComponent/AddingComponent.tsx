import styles from './AddingComponent.module.scss'

import { useRouter } from 'next/router';
export default function AddingBlock () {
   
    const router   = useRouter();
   
    return (
        <div className='main'>
              <div className={styles.container}>
                <button className='btnBlack' onClick={()=> router.push('/addCargo')}>Добавить груз</button>
                <button className='btnBlack' onClick={()=> router.push('/addCar')}>Добавить транспорт</button>
              </div>
        
          </div>

            
    )
}