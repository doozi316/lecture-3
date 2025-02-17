import React, { useEffect, useRef } from 'react';

function Card(props) {
    const imgRef = useRef(null);

    useEffect(() => {
        const options = {};
        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const previousSibling = target.previousSibling;

                    target.src = target.dataset.src;
                    previousSibling.src = previousSibling.dataset.srcset;
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        observer.observe(imgRef.current);
    }, []);

    return (
        <div className="Card text-center">
            <picture>
                <source
                    data-srcset={props.webp}
                    type="imgae/webp"
                />
                <img
                    data-src={props.image}
                    ref={imgRef}
                />
            </picture>
            <div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">
                {props.children}
            </div>
        </div>
    );
}

export default Card;
