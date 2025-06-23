import React from 'react'
import styles from './titletext.module.scss'

const TitleText = ({ title }) => {
    return (
        <div className={styles.title_text}>
            {title}
        </div>
    )
}

export default TitleText
