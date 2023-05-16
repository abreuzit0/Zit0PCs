import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { NotificacaoService } from '../notificacao.service';
import { IProduto, IProdutoCarrinho } from '../produtos';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  produtos: IProduto[] | undefined;
  produto: IProduto | undefined;
  quantidade = 1;


  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private carrinhoService: CarrinhoService,
    private notificacaoService: NotificacaoService
  ) { }

  ngOnInit(): void {
    const produtos = this.produtosService.getAll();
    this.route.queryParamMap.subscribe(params => {
      const descricao = params.get("descricao")?.toLowerCase();

      if (descricao) {
        this.produtos = produtos.filter(produto => produto.descricao.toLowerCase().includes(descricao));
        return;
      }

      this.produtos = produtos;
    })
  }

  adicionarAoCarrinho() {
    this.notificacaoService.notificar("O produto foi adicionado ao carrinho");
    const produto: IProdutoCarrinho = {
      ...this.produto!,
      quantidade: this.quantidade
    }
    this.carrinhoService.adicionarAoCarrinho(produto);
  }

}
