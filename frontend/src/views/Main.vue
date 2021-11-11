<template>
	<section class="home">
		<div class="page-header">
			<h2 class="page-title">
				Pessoas
			</h2>
		</div>
		<div class="row">
			<div class="col-lg-8 grid-margin stretch-card">
				<div class="card">
					<div class="card-body">
						<h4 class="card-title">Filtros</h4>
						<form>
							<div class="row">
								<div class="col-lg-6">
									<b-form-group label="Nome">
										<b-form-input type="text" v-model="filtro.nome" placeholder="João da Silva"/>
									</b-form-group>
								</div>
								<div class="col-lg-6">
									<b-form-group label="Data Admissão">
										<b-form-input type="text" v-model="filtro.data_admissao" placeholder="10/10/2021"/>
									</b-form-group>
								</div>
							</div>
						</form>
						<h4 class="card-title">Ações</h4>
						<div class="col-sm-4 d-flex">
							<b-button v-b-modal.pessoa-nova class="flex-grow" variant="success"> Nova Pessoa </b-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12 grid-margin stretch-card">
				<div class="card">
					<div class="card-body">
						<b-table striped hover responsive stacked="sm" :items="items" :fields="fields">
							<template #cell(actions)="row">
								<div class="d-flex">
									<b-button size="sm" variant="primary" @click="editarPessoa(row.item.id_pessoa)"><i class="mdi mdi-pencil"></i></b-button>
									<b-button size="sm" variant="danger" @click="deletarPessoa(row.item.id_pessoa)" class="ml-2"><i class="mdi mdi-delete"></i></b-button>
								</div>
							</template>
						</b-table>
					</div>
				</div>
			</div>
		</div>
		<modal-pessoa-nova @update="load"/>
		<modal-pessoa-detalhes :pessoa-id="pessoaId" @update="load"/>
	</section>
</template>

<style>
.table-hover tbody tr:hover {
	color: inherit!important;
	background-color: rgb(36,37,40); 
}

.custom-select {
	min-height: calc(2.25rem + 2px);
}
</style>

<script>
import ModalPessoaNova from "@/components/modal/PessoaNova.vue";
import ModalPessoaDetalhes from "@/components/modal/PessoaDetalhes.vue";
import client from "@/client.js";

export default {
	name: 'home',
	data() {
		return {
			filtro: {
				nome: '',
				data_admissao: ''
			},
			pessoaId: '',
			itemsOriginal: [],
			fields: [
				{
					key: 'nome',
					label: 'Nome',
					formatter: function(value) {
						return value.split(' ')[0];
					},
					sortable: true
				},
				{
					key: 'data_admissao',
					label: 'Data Admissão',
					sortable: true
				},
				{
					
					key: 'actions',
					label: 'Actions'
				}
			]
		};
	},
	components: {
		ModalPessoaNova,
		ModalPessoaDetalhes
	},
	computed: {
		items() {
			let self = this;

			return self.itemsOriginal.filter(function(item){
				if(self.filtro.nome && !(new RegExp(self.filtro.nome, 'ig').test(item.nome))) return false;
				if(self.filtro.data_admissao && !(new RegExp(self.filtro.data_admissao, 'ig').test(item.data_admissao))) return false;

				return true;
			});
		}
	},
	methods: {
		load() {
			client.get('/pessoa', (res) => {
				if(res.ok) {
					this.itemsOriginal = res.data;
				} else {
					this.$bvToast.toast(res.msg, {
						title: 'Erro',
						variant: 'danger',
						solid: true,
						toaster: 'b-toaster-bottom-center'
					});
				}
			});
		},
		deletarPessoa(pessoaId) {
			client.delete('/pessoa/'+pessoaId, (res) => {
				if(res.ok) {
					this.$bvToast.toast('Pessoa deletada do banco de dados', {
						title: 'Sucesso!',
						variant: 'success',
						solid: true,
						toaster: 'b-toaster-bottom-center'
					});
					this.load();
				} else {
					this.$bvToast.toast(res.msg, {
						title: 'Erro',
						variant: 'danger',
						solid: true,
						toaster: 'b-toaster-bottom-center'
					});
				}
			});
		},
		editarPessoa(pessoaId) {
			this.pessoaId = pessoaId;
			this.$bvModal.show('pessoa-detalhes');
		}
	},
	mounted() {
		this.load();
	}
}
</script>
