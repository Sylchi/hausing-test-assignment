<template>
<Modal v-show="$store.state.showTicketEditor" @close="$store.commit('toggleTicketEditorModal', false)">
  <template v-slot:title>
    New ticket
  </template>
  <template v-slot:default>
    <form ref="form" @submit="e => e.preventDefault()">
      <div v-for="{title, name, type, options, required} of fields" :key="name" class="form-field-container">
        <label :for="name">{{title}}</label>
        <input v-if="['text', 'email', 'password'].includes(type)" 
          :name="name" 
          :type="type" 
          v-model="values[name]"
          :required="required"
        >
        <select v-else-if="type === 'select'" 
          :name="name" 
          v-model="values[name]"
          :required="required"
        >
          <option
           v-for="{title, value} of options"
           :value="value" 
           :key="value">{{title}}
          </option>
        </select>
        <textarea v-else-if="type === 'textarea'" 
          :name="name" 
          rows="7" 
          v-model="values[name]"
          :required="required"
        ></textarea>
      </div>
    </form>
  </template>
  <template v-slot:actions>
    <button @click="submitTicket">Submit request</button>
  </template>
</Modal>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import Modal from '../components/Modal.vue'

const fields = [{
  title: 'Title',
  name: 'title',
  type: 'text',
  required: true
},{
  title: 'Email',
  name: 'email',
  type: 'email',
  required: true
},{
  title: 'Description',
  name: 'content',
  type: 'textarea',
  required: true
},{
  title: 'Priority',
  name: 'priority',
  type: 'select',
  required: true,
  options: [{
    title: "Inconvinience",
    value: 5
  },{
    title: "Mild annoyance",
    value: 4
  },{
    title: "Urgent",
    value: 3
  },{
    title: "Call the manager",
    value: 2
  },{
    title: "Wake up CEO at 3 am important",
    value: 1
  }]
}]

  export default {
    name: 'TickerEditor',
    components: { Modal },
    setup() {
      const initialValues = {};
      fields.forEach(item => initialValues[item.name] = "");
      const store = useStore();
      const state = reactive({
        form: null,
        values: {
          ...initialValues
        }
      })

      const resetValues = () => state.values = { ...initialValues }

      const submitTicket = async () => {
        const result = state.form.reportValidity();
        console.log(store)
        store.dispatch('createTicket', { data: state.values });
        console.log(result);
      } 

      return { ...toRefs(state), fields, submitTicket }
    }
  }
</script>

<style lang="scss" scoped>
.form-field-container{
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  label{
    margin-bottom: 0.5rem;
  }
}
</style>