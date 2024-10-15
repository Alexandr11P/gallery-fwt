import { useEffect, useRef, useState } from "react";
import axios from "axios";
import errUrl from "./images/error.png";
import classes from "./img.module.scss";

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

function Img({ className, src, alt }: Props) {
  const [url, setUrl] = useState("");

  const timeout = useRef({ id: null, count: 0 });

  useEffect(() => {
    function axs() {
      axios<Blob>(src || "", { responseType: "blob" })
        .then((data) => {
          setUrl(URL.createObjectURL(data.data));
        })
        .catch(() => {
          if (timeout.current.count < 3) {
            timeout.current.count += 1;
            setTimeout(() => {
              axs();
            }, 1500);
          } else setUrl(errUrl);
        });
    }
    axs();
  }, [src]);

  return url ? <img className={className} src={url} alt={alt} /> : <div className={classes.div}> </div>;
}

export default Img;
