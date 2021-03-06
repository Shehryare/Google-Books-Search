import React, { Component } from 'react';
import API from "../../../utils/API";
import Jumbotron from "../Jumbotron";
import DeleteBtn from "../../DeleteBtn";
import { Col, Row, Container } from "../../Grid";
import { List, ListItem } from "../../List";
import { Input, TextArea, FormBtn } from "../../Form";


class Books extends Component {

    state = {
        books: [],
        title: "",
        author: "",
        synopsis: ""
    }

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API.getBooks.then(res => {
            this.setState({ books: res.data, title: "", author: "", synopsis: "" })
        }).catch(err => console.log(err))
    };

    deleteBook = (id) => {
        API.deleteBook(id)
        this.setState(res => this.loadBooks())
            .catch(err => console.log(err))
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.title && this.state.author) {
            API.saveBook({
                title: this.State.title,
                author: this.state.author,
                synopsis: this.state.synopsis
            })
                .then(res => this.loadBooks())
                .catch(err => console.log(err));
        }
    };





    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col size="md-6">
                            <Jumbotron>
                                <h1>What Books Should I Read?</h1>
                            </Jumbotron>
                            <form>
                                <Input
                                    value={this.state.title}
                                    onChange={this.handleInputChange}
                                    name="title"
                                    placeholder="Title (required)"
                                />
                                <Input
                                    value={this.state.author}
                                    onChange={this.handleInputChange}
                                    name="author"
                                    placeholder="Author (required)"
                                />
                                <TextArea
                                    value={this.state.synopsis}
                                    onChange={this.handleInputChange}
                                    name="synopsis"
                                    placeholder="Synopsis (Optional)"
                                />
                                <FormBtn
                                    disabled={!(this.state.author && this.state.title)}
                                    onClick={this.handleFormSubmit}
                                >
                                    Submit Book
              </FormBtn>
                            </form>
                        </Col>
                        <Col size="md-6 sm-12">
                            <Jumbotron>
                                <h1>Books On My List</h1>
                            </Jumbotron>
                            {this.state.books.length ? (
                                <List>
                                    {this.state.books.map(book => {
                                        return (
                                            <ListItem key={book._id}>
                                                <a href={"/books/" + book._id}>
                                                    <strong>
                                                        {book.title} by {book.author}
                                                    </strong>
                                                </a>
                                                <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            ) : (
                                    <h3>No Results to Display</h3>
                                )}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Books;