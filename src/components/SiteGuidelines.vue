<template>
  <div class="guidelines sm:gutter" style="display: none; z-index: 999;">
    <div class="guidelines__border">
      <span class="guidelines__label">Full Gutter</span>
      <div class="outer">
        <div class="guidelines__border">
          <span class="guidelines__label" style="top: 1.1em">Outer</span>
          <div class="inner">
            <div class="guidelines__border">
              <span class="guidelines__label" style="top: 2.2em">Inner</span>
              <div class="gutter">
                <div class="guidelines__border">
                  <span class="guidelines__label" style="top: 3.3em">Inner Gutter</span>
                  <div class="guidelines__center"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
	name: 'SiteGuidelines',
}
</script>