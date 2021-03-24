<template>
<Modal v-if="$store.state.showTicketEditor" @close="$store.commit('toggleTicketEditorModal', false)">
  <template v-slot:title>
    {{editing ? ticketClosed ? 'Closed ticket' : 'Edit ticket' : 'New ticket'}}
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
          :disabled="ticketClosed"
        >
        <select v-else-if="type === 'select'" 
          :name="name" 
          v-model="values[name]"
          :required="required"
          :disabled="ticketClosed"
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
          :disabled="ticketClosed"
        ></textarea>
      </div>
    </form>
  </template>
  <template v-slot:actions>
    <button v-if="editing && !ticketClosed" @click="closeTicket">Close ticket</button>
    <button v-if="!ticketClosed" @click="submitTicket">{{!!values.id ? 'Save changes' : 'Submit ticket'}}</button>
  </template>
</Modal>
</template>

<script>
import { reactive, toRefs, watch, computed } from 'vue';
import { useStore } from 'vuex';
import Modal from '../components/Modal.vue';

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

      const ticketClosed = computed(() => state.values.closedAt);
      
      const editing = computed(() => state.values.id)

      const loadValues = entry => {
        state.values = { ...entry };
        store.commit('toggleTicketEditorModal', true);
      } 

      const resetValues = () => state.values = { ...initialValues }

      watch(() => store.state.showTicketEditor, newVal => {
        if(newVal === false) resetValues();
      });

      const closeTicket = async () => {
          const ticket = await store.dispatch('closeTicket', { data: state.values });
          if(ticket) store.commit('toggleTicketEditorModal', false);
      }

      const submitTicket = async () => {
        if(state.form.reportValidity()){
          const action = !!state.values.id ? 'updateTicket' : 'createTicket';
          const ticket = await store.dispatch(action, { data: state.values });
          if(ticket) store.commit('toggleTicketEditorModal', false);
        }
      } 

      return { ...toRefs(state), fields, submitTicket, loadValues, closeTicket, ticketClosed, editing }
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