import React from 'react'

const styles = require('./image.module.scss');

export type ImageProps = {
    src: string,
    alt?: string
    padding?: number
    width?: string | number
}

export const Image = ({src, alt, padding, width} : ImageProps) => {
    return(
        <div className={styles.container}>
            <img alt={alt || ''} src={src} className={styles.image} style={{padding: padding || 0, width: width || '90%'}}></img>
        </div>
    )
}