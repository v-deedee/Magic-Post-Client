import { connect } from "react-redux";
import { Component } from "react";
import { Checkbox, Table, Button, Modal } from "flowbite-react";

export interface ICreateNewTransactionProps extends IReduxState, IReduxAction {}

export interface ICreateNewTransactionState {
  openModal: boolean,
}

class CreateNewTransaction extends Component<
  ICreateNewTransactionProps,
  ICreateNewTransactionState
> {
  state: ICreateNewTransactionState = {
    openModal: false,
  };


  setOpenModal = (openModal: boolean) => {
    this.setState({
        openModal: openModal
    })  
  }
  

  render() {
    return (
      <div>
        <div className="block border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 lg:mt-1.5">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All products
            </h1>
          </div>

          <div className="flex justify-around align-middle">
            <div className="w-96">
              <form>
                <label
                  htmlFor="default-search"
                  className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                    <svg
                      className="h-4 w-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Product, customer"
                    required={true}
                  />
                  <button
                    type="submit"
                    className="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div>
              <Button.Group>
                <Button color="green" onClick={() => this.setOpenModal(true)}>Create</Button>
                <Modal show={this.state.openModal} onClose={() => this.setOpenModal(false)}>
                  <Modal.Header>Terms of Service</Modal.Header>
                  <Modal.Body>
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        With less than a month to go before the European Union
                        enacts new consumer privacy laws for its citizens,
                        companies around the world are updating their terms of
                        service agreements to comply.
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        The European Union’s General Data Protection Regulation
                        (G.D.P.R.) goes into effect on May 25 and is meant to
                        ensure a common set of data rights in the European
                        Union. It requires organizations to notify users as soon
                        as possible of high-risk data breaches that could
                        personally affect them.
                      </p>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => this.setOpenModal(false)}>
                      I accept
                    </Button>
                    <Button color="gray" onClick={() => this.setOpenModal(false)}>
                      Decline
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Button color="red">Delete</Button>
              </Button.Group>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="p-4">
                  <Checkbox />
                </Table.HeadCell>
                <Table.HeadCell>Item name</Table.HeadCell>
                <Table.HeadCell>Value</Table.HeadCell>
                <Table.HeadCell>Sender</Table.HeadCell>
                <Table.HeadCell>Receiver</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-4">
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {'Apple MacBook Pro 17"'}
                  </Table.Cell>
                  <Table.Cell>Sliver</Table.Cell>
                  <Table.Cell>Laptop</Table.Cell>
                  <Table.Cell>$2999</Table.Cell>
                  <Table.Cell>
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </a>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-4">
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Microsoft Surface Pro
                  </Table.Cell>
                  <Table.Cell>White</Table.Cell>
                  <Table.Cell>Laptop PC</Table.Cell>
                  <Table.Cell>$1999</Table.Cell>
                  <Table.Cell>
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </a>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-4">
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Magic Mouse 2
                  </Table.Cell>
                  <Table.Cell>Black</Table.Cell>
                  <Table.Cell>Accessories</Table.Cell>
                  <Table.Cell>$99</Table.Cell>
                  <Table.Cell>
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </a>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

interface IReduxState {}

const mstp = (state, {}): IReduxState => {
  return {};
};

interface IReduxAction {}

const mdtp = (dispatch, {}): IReduxAction => {
  return {};
};

export default connect(mstp, mdtp)(CreateNewTransaction);
