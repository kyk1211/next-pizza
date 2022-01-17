import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Props {
  product: products;
}

interface Extra {
  text?: string;
  price?: number;
}

export default function Edit({ product }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.desc);
  const [prices, setPrices] = useState(product.prices);
  const [extra, setExtra] = useState<Extra>();
  const [extraOpts, setExtraOpts] = useState<Extra[]>(product.extraOptions);

  const handleExtraInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name },
    } = e;
    const {
      target: { value },
    } = e;
    if (name === 'price') {
      setExtra({ ...extra, [name]: Number(value) });
    } else {
      setExtra({ ...extra, [name]: value });
    }
  };

  const handleExtra = () => {
    if (extra?.text && extra.price) {
      setExtraOpts((prev) => [...prev, extra]);
    } else {
      alert('값을 모두 입력하세요!');
    }
  };

  const handleEdit = async () => {
    if (!file) {
      try {
        const editProduct = {
          title,
          desc,
          prices,
          extraOptions: extraOpts,
          img: product.img,
        };
        await axios.put(`/api/products/${id}`, editProduct);
        alert('수정 완료');
        router.replace('/admin');
      } catch (err) {
        alert('실패');
        console.log(err);
      }
    } else {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'uploads');
      try {
        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
          data
        );
        const {
          data: { url },
        } = uploadRes;
        const editProduct = {
          title,
          desc,
          prices,
          extraOptions: extraOpts,
          img: url,
        };
        await axios.put(`/api/products/${id}`, editProduct);
        alert('수정 완료');
        router.replace('/admin');
      } catch (err) {
        alert('실패');
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <div>
        <label>Choose an image</label>
        <input
          type="file"
          onChange={(e) => {
            const files = e.target.files as FileList;
            setFile(files[0]);
          }}
        />
      </div>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Desc</label>
        <textarea
          rows={4}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div>
        <label>Prices</label>
        <div>
          <input
            type="number"
            placeholder="Small"
            value={prices[0]}
            onChange={(e) =>
              setPrices((prev) => {
                const arr = [...prev];
                arr[0] = Number(e.target.value);
                return arr;
              })
            }
          />
          <input
            type="number"
            placeholder="Medium"
            value={prices[1]}
            onChange={(e) =>
              setPrices((prev) => {
                const arr = [...prev];
                arr[1] = Number(e.target.value);
                return arr;
              })
            }
          />
          <input
            type="number"
            placeholder="Large"
            value={prices[2]}
            onChange={(e) =>
              setPrices((prev) => {
                const arr = [...prev];
                arr[2] = Number(e.target.value);
                return arr;
              })
            }
          />
        </div>
        <div>
          <label>Extra</label>
          <div>
            <input
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button onClick={handleExtra}>Add</button>
          </div>
          <div>
            {extraOpts.map((option) => (
              <div key={option.text}>
                <span>{option.text}</span>
                <span> x</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.DOMAIN}/api/products/${params?.id}`
  );

  return {
    props: {
      product: res.data,
    },
  };
};
