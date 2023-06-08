import { JsonDataReader } from "../../../shared/adapters/jsonDataReader";
import { ItemProps } from "../entities/item";
import { ItemMemoriaRepository } from "../repositories/itemMemoria.repository";
import { ItemSeeder } from "../seeders/item.seeder";
import { EditarItemUseCase } from "./editarItem.usecase";

test("Deve cadastrar um item", async function () {
  const itensDataReader = new JsonDataReader<ItemProps[]>();
  const itensRepository = new ItemMemoriaRepository();
  const itensSeeder = new ItemSeeder(itensRepository, itensDataReader);
  const expectedLength = await itensSeeder.seed();
  const output = await itensRepository.listar();
  expect(output).toHaveLength(expectedLength);
});

test("Deve editar um item", async function () {
  const itensRepository = new ItemMemoriaRepository();
  const editarItemUseCase = new EditarItemUseCase(itensRepository);
  const itens = await itensRepository.listar();
  if (itens[0]) {
    const newItemProps: ItemProps = {
      id: itens[0].id,
      nome: "Big Mac",
      tipo: "lanche",
      preco: 39.9,
      medida: "unidade",
      aceitaOpcional: true,
      descricao:
        "Hambúrguer (100% carne bovina), alface americana, queijo cheddar, maionese Big Mac, cebola, picles e pão com gergelim",
    };
    const output = await editarItemUseCase.execute(newItemProps);
    expect(output).toMatchObject(newItemProps);
  }

  //   expect(output).toHaveLength(expectedLength);
});
