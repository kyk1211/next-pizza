import styles from '@styles/Admin.module.css';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Admin({
  products,
  orders,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [pizzaList, setPizzaList] = useState<products[]>(products);
  const [orderList, setOrderList] = useState<orders[]>(orders);
  const status = ['Preparing', 'On the way', 'Delivered'];
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/products/${id}`);
      setPizzaList(pizzaList.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusNext = async (id: string) => {
    const item = orderList.filter((order) => order.orderId === id)[0];
    const currentStatus = item.status;
    try {
      const res = await axios.put(`/api/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order.orderId !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrderDelete = async (id: string) => {
    try {
      await axios.delete(`/api/orders/${id}`);
      setOrderList((prev) => prev.filter((item) => item.orderId !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogOut = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      try {
        const res = await axios.delete(`/api/login`);
        router.replace('/admin/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={handleLogOut}>
        LogOut
      </button>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          {pizzaList.map((product: products) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id?.slice(0, 5) + '...'}</td>
                <td>{product.title}</td>
                <td>{product.prices[0]}</td>
                <td>
                  <button className={styles.button}>
                    <Link href={`/admin/edit/${product._id}`}>
                      <a>Edit</a>
                    </Link>
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id as string)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td
                  onClick={() => router.replace(`/orders/${order.orderId}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {order.orderId.slice(0, 5) + '...'}
                </td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td>{order.status < 3 ? status[order.status] : 'End'}</td>
                <td>
                  <button onClick={() => handleStatusNext(order.orderId)}>
                    Next Stage
                  </button>
                  <button onClick={() => handleOrderDelete(order.orderId)}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const myCookie = ctx.req.cookies || '';

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  const products = await axios.get(`${process.env.DOMAIN}/api/products`);
  const orders = await axios.get(`${process.env.DOMAIN}/api/orders`);
  return {
    props: {
      products: products.data,
      orders: orders.data,
    },
  };
};
