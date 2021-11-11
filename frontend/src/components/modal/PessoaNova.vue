<template>
	<!-- The modal -->
	<b-modal id="pessoa-nova" :hide-header-close="true" title="Nova Pessoa" @hide="reset" ref="modal">
		<form>
			<div class="row">
				<div class="col-lg-12">
					<b-form-group label="Nome">
						<b-form-input type="text" v-model="form.nome" placeholder="João da Silva"/>
					</b-form-group>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<b-form-group label="RG">
						<b-form-input type="text" v-model="form.rg" placeholder="11.111.11-11"/>
					</b-form-group>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<b-form-group label="CPF">
						<b-form-input type="text" v-model="form.cpf" placeholder="222.222.222-22"/>
					</b-form-group>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<b-form-group label="Data Nascimento">
						<b-form-input type="text" v-model="form.data_nascimento" placeholder="02/02/2021"/>
					</b-form-group>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<b-form-group label="Data Admissão">
						<b-form-input type="text" v-model="form.data_admissao" placeholder="02/02/2021"/>
					</b-form-group>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<b-form-group label="Função">
						<b-form-input type="text" v-model="form.funcao" placeholder=""/>
						<b-form-text>Opcional</b-form-text>
					</b-form-group>
				</div>
			</div>
		</form>
		<template #modal-footer="{ cancel }">
			<div class="row col-12 justify-content-end">
				<div class="col-sm-12 col-lg-3">
					<b-button @click="cancel()" block :disabled="enviando">Cancelar</b-button>
				</div>
				<div class="col-sm-12 col-lg-2 mt-sm-3 mt-lg-0">
					<b-button variant="primary" @click="submit" block :disabled="enviando">
						OK
						<b-spinner small v-if="enviando"></b-spinner>
					</b-button>
				</div>
			</div>
		</template>
	</b-modal>
</template>

<script>
import client from "@/client.js";

export default {
	data() {
		return {
			enviando: false,
			form: {
				rg: '',
				cpf: '',
				data_admissao: '',
				data_nascimento: '',
				funcao: '',
				nome: ''
			}
		}
	},
	methods: {
		submit() {
			this.enviando = true;
			client.post('/pessoa', this.form, (res) => {
				this.enviando = false;
				if(res.ok) {
					this.$bvToast.toast('Nova pessoa inserida', {
						title: 'Sucesso!',
						variant: 'success',
						solid: true,
						toaster: 'b-toaster-bottom-center'
					});
					this.$refs.modal.hide();
					this.$emit('update');
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
		reset() {
			this.form = {
				cpf: '',
				data_admissao: '',
				data_nascimento: '',
				funcao: '',
				nome: ''
			}
		}
	}
}
</script>