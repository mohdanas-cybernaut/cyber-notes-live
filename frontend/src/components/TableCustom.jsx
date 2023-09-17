import React from 'react'
import { FiDownload } from "react-icons/fi"
import { Table } from 'flowbite-react';
import { getDoc } from '../scripts/getDoc';
export const TableCustom = (props) => {
  console.log(props);
  const handleClick = async (id)=>{
    try {
      await getDoc(id)
    } catch (error) {
      console.log(error);
    }
  }
  return (

    <Table>
      <Table.Head>
        <Table.HeadCell className='bg-gray-900'>
          File Name
        </Table.HeadCell>
        <Table.HeadCell className='bg-gray-900'>
          Download
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {props.items.map(e => {
          return (<> <Table.Row className="border-gray-700 bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-white">
             {e.fileName}
            </Table.Cell>
            <Table.Cell>
              <button onClick={()=>handleClick(e._id)} className='hover:text-blue-700'><FiDownload /></button>
            </Table.Cell>
          </Table.Row></>)
        })}
      </Table.Body>
    </Table>
  )
}

