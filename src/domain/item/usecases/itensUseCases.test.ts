import { JsonDataReader } from "@shared/adapters/jsonDataReader";
import { ItemProps } from "@domain/item/entities/item";
import { ItemMemoriaRepository } from "@domain/item/repositories/itemMemoria.repository";
import { ItemSeeder } from "@domain/item/seeders/item.seeder";
import { EditarItemUseCase } from "@domain/item/usecases/editarItem.usecase";

const itensDataReader = new JsonDataReader<ItemProps[]>();
const itensRepository = new ItemMemoriaRepository();

describe('Testando itens',()=>{
  test("Deve cadastrar um item", async function () {
    const itensSeeder = new ItemSeeder(itensRepository, itensDataReader);
    const expectedLength = await itensSeeder.seed();
    const output = await itensRepository.listar();
    expect(output).toHaveLength(expectedLength);
  });
  
  test("Deve editar um item", async function () {
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
  
  test("Deve deletar um item", async function () {
    const itensRepository = new ItemMemoriaRepository();
    const initialLength = (await itensRepository.listar())?.length;
    const item = (await itensRepository.listar())[0];
    const output = await itensRepository.deletar({ id: item.id });
    const endLength = (await itensRepository.listar())?.length;
    expect(output).toBeTruthy();
    expect(endLength).toBe(initialLength - 1);
  });
})
