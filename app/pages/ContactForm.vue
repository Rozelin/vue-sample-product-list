<template>
  <div class="container">
    <div class="row centered">
      <div class="col-l-12 col-m-12 col-s-12">
        <h1 class="contact-title">{{ 'Contact Us' }}</h1>
      </div>
      <div class="col-l-6 col-m-8 col-s-12">
        <form
            v-if="!formIsSubmitted"
            class="contact-form"
            novalidate
            @submit.prevent="submitContactForm"
        >
          <!-- First name -->
          <base-input
              id="firstNameInp"
              type="text"
              name="first-name"
              placeholder="Enter your name"
              autocomplete="given-name"
              :required="true"
              @input="setFormData($event, 'firstName')"
          />

          <!-- Last name -->
          <base-input
              id="lastNameInp"
              type="text"
              name="last-name"
              placeholder="Enter your last name"
              autocomplete="family-name"
              :required="true"
              @input="setFormData($event, 'lastName')"
          />

          <!-- Email -->
          <base-input
              id="emailInp"
              type="email"
              name="email"
              placeholder="Enter your email"
              autocomplete="email"
              :required="true"
              @input="setFormData($event, 'email')"
          />

          <!-- Phone -->
          <base-input
              id="telInp"
              type="tel"
              name="phone-number"
              placeholder="Enter your phone number"
              autocomplete="tel"
              :required="true"
              @input="setFormData($event, 'tel')"
          />

          <!-- Password -->
          <base-input
              id="passInp"
              type="password"
              name="password"
              placeholder="Enter your password"
              autocomplete="new-password"
              :required="true"
              @input="setFormData($event, 'password')"
          />

          <!-- Submit -->
          <button
              class="button-primary contact-submit"
              type="submit"
              :disabled="!formIsValid"
          >
            <icon name="envelope" :size="26"/>
            Send a message
          </button>
        </form>
        <div
            v-else
            class="contact-success">
          <h2>Dear {{ form.firstName }} {{ form.lastName }}!</h2>
          <p>Your message has been submitted successfully!</p>
          <p>We'll contact you asap!</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseInput from '@app/components/formElements/BaseInput';
import Icon from '@app/components/Icon';

export default {
  name: 'ContactForm',
  components: {
    BaseInput,
    Icon,
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        tel: '',
        password: '',
      },
      formIsSubmitted: false,
    };
  },
  computed: {
    formIsValid() {
      // Check that all fields are complete
      return Object.values(this.form).every(i => i);
    }
  },
  methods: {
    submitContactForm() {
      if (!this.formIsValid) return false;
      this.formIsSubmitted = true;
    },
    setFormData($event, field) {
      this.form[field] = $event;
    },
  },
}
</script>
<style lang="scss" scoped>
@import "src/scss/_colors.scss";
@import "src/scss/typography/_text.scss";

.contact {
  &-form {
    padding: 20px;
    background-color: $color-white;
    border-radius: 5px;
  }

  &-title {
    @include text-fancy-big;
    text-align: center;

    @media (max-width: 768px) {
      @include text-fancy-medium;
    }
  }

  &-submit {
    @include text-fancy-small;
    display: flex;
    align-items: center;
    font-weight: normal;
    padding: 10px 20px;
    width: 100%;

    @media (max-width: 768px) {
      margin-top: 50px;
    }

    &:disabled {
      pointer-events: none;
      opacity: .6;
    }

    .icon {
      margin-right: 10px;
    }
  }

  &-success {
    padding: 40px 20px;
    text-align: center;
    color: $color-secondary;
    background-color: $color-white;
    border-radius: 5px;

    h2 {
      @include text-fancy-medium;
      align-items: center;
      color: $color-primary;
      margin-bottom: 30px;
    }
  }
}
</style>
