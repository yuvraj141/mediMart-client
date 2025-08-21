import styles from './banner.module.css';

interface ProductBannerProps {
  title: string;
  path: string;
  img: string; // image URL (from public folder or imported .src)
}

const ProductBanner = ({ title, path, img }: ProductBannerProps) => {
  return (
    <div>
 <div
      className={`${styles.banner} border-2 border-white rounded-3xl mt-10 flex justify-center items-center`}
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* <div className="text-center bg-black/40 text-white p-4 rounded-lg">
        <h2 className="font-bold text-2xl leading-loose">{title}</h2>
        <p>{path}</p>
      </div> */}
    </div>
    <h2 className='font-bold text-2xl text-center my-5'>{title}</h2>
    </div>
   
  );
};

export default ProductBanner;
