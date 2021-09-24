import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

export default function SearchForm({ params, handleSearch }) {
    return (
        <Form className="mb-4">
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" value={params.description} onChange={handleSearch} placeholder="job name" />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>location</Form.Label>
                    <Form.Control type="text" name="location" value={params.location} onChange={handleSearch} placeholder="location" />
                </Form.Group>
            </Row>
        </Form>
    )
}
