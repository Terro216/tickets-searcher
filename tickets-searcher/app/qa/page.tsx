import styles from './page.module.scss'
import arrowIcon from '@/public/icons/arrow.svg'
import Image from 'next/image'

const qaList = [
  {
    title: 'Что такое билетопоиск?',
    content:
      'Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов.',
  },
  {
    title: 'Какой компании принадлежит Билетопоиск?',
    content: `Владельцем проекта являлась компания ООО «Билетопоиск», которой принадлежало 60 % акций проекта, 40 % акций принадлежало её совладельцу — французской компании ООО AlloCiné. 15 октября 2013 года сервис купила компания «Яндекс» (размер сделки — $80 млн, около 2,6 млрд рублей на то время).`,
  },
  {
    title: 'Как купить билет на Билетопоиск?',
    content: 'Выбрать фильмы на главной странице или на странице фильма, оформить заказ в корзине.',
  },
  {
    title: 'Как оставить отзыв на Билетопоиск?',
    content: 'К сожалению, пока никак',
  },
]

export default function QA() {
  return (
    <section className={styles.qaWrapper}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>Вопросы-ответы</h2>
      </div>
      {qaList.map((qa, i) => (
        <Details key={qa.title + i} title={qa.title} content={qa.content} />
      ))}
    </section>
  )
}

const Details = ({ title, content }: { title: string; content: string }) => {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>
        <span>{title}</span>
        <Image className={styles.arrow} src={arrowIcon} alt='Раскрыть вопрос' />
      </summary>
      <div className={styles.content}>{content}</div>
    </details>
  )
}
