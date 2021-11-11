<template>
	<div id="app">
		<section class="main-view">
			<div class="container-scroller">
				<Sidebar/>
				<div class="container-fluid page-body-wrapper">
					<Header/>
					<div class="main-panel">
						<div class="content-wrapper">
							<router-view></router-view>
						</div> <!-- content wrapper ends -->
						<Footer/>
					</div> <!-- main panel ends -->
				</div> <!-- page-body-wrapper ends -->
			</div>
		</section>
	</div>
</template>

<script>
import Header from "./layout/partials/Header";
import Sidebar from "./layout/partials/Sidebar";
import Footer from "./layout/partials/Footer";

export default {
	name: 'app',
	components: {
		Header,
		Sidebar,
		Footer
	}
}
</script>

<style lang="scss">
@import "../node_modules/@mdi/font/css/materialdesignicons.min.css";
@import "../node_modules/flag-icon-css/css/flag-icon.min.css";
@import "./assets/scss/style";
</style>
