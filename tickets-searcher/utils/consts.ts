import { Genre, ruGenre } from '@/lib/redux/services/movieApi'

type GenreTranslator = {
  [Property in Genre]: ruGenre
}

export let genreTranslator: GenreTranslator = {
  'horror': 'Хоррор',
  'action': 'Боевик',
  'comedy': 'Комедия',
  'fantasy': 'Фэнтези',
  '': '',
}
