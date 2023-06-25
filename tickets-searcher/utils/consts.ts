import { Genre, ruGenre } from '@/lib/redux/services/movieApi'

interface GenreTranslator {
  [genre: Genre]: ruGenre
}

export let genreTranslator: GenreTranslator = {
  'horror': 'Хоррор',
  'action': 'Боевик',
  'comedy': 'Комедия',
  'fantasy': 'Фэнтези',
  '': '',
}
