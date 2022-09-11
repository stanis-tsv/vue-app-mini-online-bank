<template>
  <app-page back title="Допомога">
    <question-item
      v-for="q in questions"
      :key="q.title"
      :question="q"
    ></question-item>
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import QuestionItem from '@/components/question/QuestionItem'

export default {
	components: { AppPage, QuestionItem },
  setup() {
    const questions = [
      {title: 'Що є в цій системі?', text: 'В цій системі можна побачити створені користувачем заявки, додати нові, видалити, змінити статус'},
      {title:'Як працює реєстрація/авторизація?', text:'Все реалізовано через Firebase'}
    ]

    return {
      questions
    }
  },
}
</script>
