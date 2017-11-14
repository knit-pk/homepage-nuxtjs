export default {
  methods: {
    formatDateToLocalString (date, locale = 'pl', format = { month: 'long', day: '2-digit', year: 'numeric' }) {
      return new Date(date).toLocaleString(locale, format)
    }
  }
}
