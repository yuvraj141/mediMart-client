'use client'
import {TProduct ,TMeta} from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ColumnDef } from "@tanstack/react-table"

import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { Edit, Eye, Plus, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TablePagination from '@/components/ui/core/MMTable/TablePagination'
import DiscountModal from './DiscountModal'
import { MMTable } from '@/components/ui/core/MMTable'

const ManageProducts=({products,meta
}:{products:TProduct[],meta:TMeta})=>{
 
    const router=useRouter()
    const [selectedIds,setSelectedIds]=useState<string[]|[]>([])

    const handleView=(product:TProduct)=>{
        console.log('viewing product :',product);
    }
     const handleDelete=(productId:string)=>{
            console.log('deleting product id :',productId);
        }

     const columns: ColumnDef<TProduct>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (value) {
              setSelectedIds((prev) => [...prev, row.original._id]);
            } else {
              setSelectedIds(
                selectedIds.filter((id) => id !== row.original._id)
              );
            }
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.images[0]}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.original.category.name}</span>,
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => <span>{row.original.brand.name}</span>,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <span>{row.original.stock}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>$ {row.original.price.toFixed(2)}</span>,
    },
    {
      accessorKey: "offerPrice",
      header: "Ofter Price",
      cell: ({ row }) => (
        <span>
          $ {row.original.offerPrice ? row.original.offerPrice.toFixed(2) : "0"}
        </span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            className="text-gray-500 hover:text-blue-500"
            title="View"
            onClick={() => handleView(row.original)}
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() =>
              router.push(
                `/user/shop/products/update-product/${row.original._id}`
              )
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete"
            onClick={() => handleDelete(row.original._id)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <h2 className='text-center font-bold p-4 text-3xl'>Manage Products</h2>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold"> Total Products count:{meta?.total}</h1>
        <div className="flex items-center gap-2">
          <Button className='cursor-pointer transition-transform duration-300 bg-red-600 hover:bg-red-600'
            onClick={() => router.push("/user/shop/products/add-product")}
            size="sm"
          >
            Add Product <Plus />
          </Button>
          
          <DiscountModal
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </div>
      </div>
      <MMTable columns={columns} data={products || []} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
}
export default ManageProducts