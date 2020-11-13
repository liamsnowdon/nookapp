<template>
  <footer class="footer">
    <div class="footer__main">
      <div class="footer__links">
        <router-link
          class="footer__link"
          :to="{ name: 'Fish' }"
        >
          Critterpedia
        </router-link>

        <router-link
          class="footer__link"
          :to="{ name: 'Fossils' }"
        >
          Fossils
        </router-link>

        <router-link
          class="footer__link"
          :to="{ name: 'Villagers' }"
        >
          Villagers
        </router-link>

        <router-link
          class="footer__link"
          :to="{ name: 'Checklist' }"
        >
          Daily Checklist
        </router-link>
      </div>

      <div class="footer__social">
        <h6>NookApp developed by Liam Snowdon</h6>

        <div class="footer__social-links">
          <a
            class="footer__social-link"
            href="https://www.linkedin.com/in/liam-snowdon/"
            target="_blank"
          >
            <i class="fa fa-linkedin-square" />
          </a>

          <a
            class="footer__social-link"
            href="https://github.com/liamsnowdon"
            target="_blank"
          >
            <i class="fa fa-github-square" />
          </a>
        </div>
      </div>
    </div>

    <p>Data supplied by the awesome people behind <a href="https://acnhapi.com" target="_blank">ACNHAPI</a> :)</p>

    <div class="footer__disclaimer">
      <p><strong>Disclaimer</strong></p>
      <p>
        NookApp is a fan made website and claims no ownership of any intellectual property associated with Nintendo or
        Animal Crossing. All assets found on the site are the sole property of Nintendo and are only
        used for non-commercial and educational purpose.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss">
  .footer {
    margin: 50px auto 0;
    max-width: 800px;
    padding: 0 20px;
    color: var(--footer-text-color);
    font-size: 14px;

    a {
      color: var(--footer-text-color);
    }

    &__main {
      display: flex;
      margin-bottom: 30px;
    }

    &__links {
      flex: 0 1 auto;
      border-right: 2px solid var(--footer-text-color);
      padding-right: 20px;
      margin-right: 20px;
    }

    &__link {
      display: block;
      margin: 10px;
    }

    &__social {
      flex: 1 0 0;
    }

    &__social-links {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 2px solid var(--footer-text-color);
    }

    &__social-link {
      font-size: 30px;

      &:not(:last-child) {
        margin-right: 10px;
      }
    }

    &__disclaimer {
      margin-top: 30px;
    }
  }
</style>
